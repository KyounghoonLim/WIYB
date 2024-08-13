import { CookieSerializeOptions } from 'cookie'
import { NextRequest } from 'next/server'

export { MiddlewareModule, MiddlewareModuleResult, MiddleWareResponseCookie }

type MiddlewareModule = (
  req: NextRequest,
  res?: MiddlewareModuleResult
) => MiddlewareModuleResult | Promise<MiddlewareModuleResult>

type MiddlewareModuleResult = {
  url?: {
    path: string
    search?: string
    redirect?: boolean
  }
  cookies?: MiddleWareResponseCookie[]
}

type MiddleWareResponseCookie = {
  key: string
  value: string
  options?: CookieSerializeOptions
}
