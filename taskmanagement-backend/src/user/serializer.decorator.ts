import { UseInterceptors } from "@nestjs/common/decorators/core/use-interceptors.decorator";
import { SerializeInterceptor } from "src/interceptors/serialize.interceptor";

export function Serialize(dto: any){
    return UseInterceptors(new SerializeInterceptor(dto))
}