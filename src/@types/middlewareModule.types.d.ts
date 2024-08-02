import { CookieSerializeOptions } from "cookie";
import { NextRequest } from "next/server";

export { MiddlewareModule, MiddlewareModuleResult };

type MiddlewareModule = (req: NextRequest, res?: MiddlewareModuleResult) => MiddlewareModuleResult | Promise<MiddlewareModuleResult>;

type MiddlewareModuleResult = {
  url?: {
    path: string;
    redirect?: boolean;
  };
  cookie?: {
    key: string;
    value: string;
    options?: CookieSerializeOptions;
  };
};
