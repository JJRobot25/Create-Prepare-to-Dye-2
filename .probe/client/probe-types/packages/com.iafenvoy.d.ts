declare module "packages/com/iafenvoy/tooltipsreforged/mixin/$KeyBindingAccessor" {
import {$InputConstants$Key, $InputConstants$Key$Type} from "packages/com/mojang/blaze3d/platform/$InputConstants$Key"

export interface $KeyBindingAccessor {

 "getBoundKey"(): $InputConstants$Key

(): $InputConstants$Key
}

export namespace $KeyBindingAccessor {
const probejs$$marker: never
}
/**
 * Class-specific type exported by ProbeJS, use global Type_
 * types for convenience unless there's a naming conflict.
 */
export type $KeyBindingAccessor$Type = ($KeyBindingAccessor);
/**
 * Global type exported for convenience, use class-specific
 * types if there's a naming conflict.
 */
declare global {
export type $KeyBindingAccessor_ = $KeyBindingAccessor$Type;
}}
declare module "packages/com/iafenvoy/tooltipsreforged/mixin/$DecorationItemAccessor" {
import {$EntityType, $EntityType$Type} from "packages/net/minecraft/world/entity/$EntityType"

export interface $DecorationItemAccessor {

 "getEntityType"(): $EntityType<(any)>

(): $EntityType<(any)>
}

export namespace $DecorationItemAccessor {
const probejs$$marker: never
}
/**
 * Class-specific type exported by ProbeJS, use global Type_
 * types for convenience unless there's a naming conflict.
 */
export type $DecorationItemAccessor$Type = ($DecorationItemAccessor);
/**
 * Global type exported for convenience, use class-specific
 * types if there's a naming conflict.
 */
declare global {
export type $DecorationItemAccessor_ = $DecorationItemAccessor$Type;
}}
