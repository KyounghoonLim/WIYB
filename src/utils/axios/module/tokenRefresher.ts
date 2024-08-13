import { tokenRefreshApi } from 's/services/authApi'

/// 두 시간(ms)
const cacheingTime = 2 * 3600 * 1000

export class TokenRefresher {
  /// 토큰 갱신 task
  private task: any

  /// 이전 task 가 종료되었을 때 event 를 캐치하지 못한 경우를 대비
  /// timestamp 는 성공했을 경우에만 기록
  private lastTaskState: { state: boolean; timestamp?: number }

  constructor() {}

  /**
   * task 에
   */
  private async addTask() {
    try {
      this.task = tokenRefreshApi
      await this.task()
      this.lastTaskState = {
        state: true,
        timestamp: Date.now(),
      }
    } catch {
      this.lastTaskState = {
        state: false,
      }
    } finally {
      this.task = undefined
    }
  }

  /**
   * 토큰 갱신 task 를 추가할 수 있는지 여부 판단
   */
  private isTaskAddable() {
    if (this.task) return false
    else if (
      this.lastTaskState?.timestamp &&
      Date.now() - this.lastTaskState.timestamp >= cacheingTime
    )
      return false
    else return true
  }

  queueing(callback: () => any) {
    if (this.isTaskAddable()) this.addTask()
    const self = this

    return new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        if (self.task || !self.lastTaskState) return /// 아직 task 가 끝나지 않음, 계속 대기
        else {
          clearInterval(interval)
          try {
            const res = await callback()
            resolve(res)
          } catch {
            reject()
          }
        }
      }, 500)
    })
  }
}
