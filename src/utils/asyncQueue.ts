export default class AsyncQueue<T = any> {
  private queue: Array<{
    id: string
    task: () => Promise<T | void>
  }>
  private size: number
  private autoExecute: boolean
  private errorRetryCount: number
  private _count = 0
  private limitation: number
  private timer: NodeJS.Timeout
  private executing: boolean
  private id: string

  constructor(size, errorRetryCount = 0, limitation = 30000, autoExecute = true, id?: string) {
    this.queue = []
    this.autoExecute = autoExecute
    this.executing = false
    this.size = size
    this.errorRetryCount = errorRetryCount
    this.limitation = limitation
    this.id = id
  }

  async execute() {
    if (this.executing || this.queue.length === 0) {
      return
    }

    const task = this.queue[0].task

    const ts = performance.now()
    try {
      this.id &&
        console.log(
          '%c ----------------- ' +
            'queue-id: ' +
            this.id +
            ' / timestamp: ' +
            ts.toFixed(0) +
            ' start -----------------',
          'color:pink'
        )
      this.executing = true
      this.getTaskTimer()
      await task()
      const ts2 = performance.now()
      this.id &&
        console.log(
          '%c ----------------- ' +
            'queue-id: ' +
            this.id +
            ' / timestamp: ' +
            ts.toFixed(0) +
            ' / duration: ' +
            (ts2 - ts).toFixed(0) +
            'ms complete  -----------------',
          'color:pink'
        )
      this.queue.shift()
    } catch (error) {
      if (this._count >= this.errorRetryCount) {
        this._count = 0
        this.queue.shift()
      } else {
        this._count++
        console.error(error)
      }
    } finally {
      this.executing = false
      this.removeTaskTimer()
      this.execute()
    }
  }

  addTask(task: () => Promise<T>) {
    if (this.queue.length >= this.size) {
      this.queue[this.size - 1].task = task
    } else {
      const tid = btoa(task.toString())
      if (!this.queue.some((t) => t.id === tid)) {
        this.queue.push({
          id: tid,
          task,
        })
      }
    }

    this.autoExecute && this.execute()
  }

  clear() {
    this.removeTaskTimer()
    this.queue = []
    this.executing = false
  }

  isTaskRemained(idx = 0) {
    return Boolean(this.queue[idx + 1])
  }

  getTaskTimer() {
    return new Promise((_, reject) => {
      this.timer = setTimeout(() => {
        console.log(
          '%c ----------------- task terminate: overdued limitation time -----------------',
          'color:red'
        )
        reject(
          new Error('----------------- task terminate: overdued limitation time -----------------')
        )
      }, this.limitation)
    })
  }

  removeTaskTimer() {
    clearTimeout(this.timer)
  }
}
