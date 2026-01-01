declare module "packages/com/jagrosh/discordipc/entities/$RichPresence" {
import {$OffsetDateTime, $OffsetDateTime$Type} from "packages/java/time/$OffsetDateTime"
import {$JSONObject, $JSONObject$Type} from "packages/org/json/$JSONObject"

export class $RichPresence {

constructor(arg0: string, arg1: string, arg2: $OffsetDateTime$Type, arg3: $OffsetDateTime$Type, arg4: string, arg5: string, arg6: string, arg7: string, arg8: string, arg9: integer, arg10: integer, arg11: string, arg12: string, arg13: string, arg14: boolean)

public "toJson"(): $JSONObject
}
/**
 * Class-specific type exported by ProbeJS, use global Type_
 * types for convenience unless there's a naming conflict.
 */
export type $RichPresence$Type = ($RichPresence);
/**
 * Global type exported for convenience, use class-specific
 * types if there's a naming conflict.
 */
declare global {
export type $RichPresence_ = $RichPresence$Type;
}}
