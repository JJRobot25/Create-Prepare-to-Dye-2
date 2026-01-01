declare module "packages/com/sunekaer/sdrp/integration/kubejs/$SDRPKubeJSWrapper" {
import {$RichPresence, $RichPresence$Type} from "packages/com/jagrosh/discordipc/entities/$RichPresence"

/**
 * This class is not allowed By KubeJS!
 * You should not load the class, or KubeJS will throw an error.
 * Loading the class using require() will not throw an error, but the class will be undefined.
 */
export class $SDRPKubeJSWrapper {

constructor()

public static "setState"(message: string, imageName: string, imageKey: string): void
public static "getCurrentState"(): $RichPresence
get "currentState"(): $RichPresence
}
/**
 * Class-specific type exported by ProbeJS, use global Type_
 * types for convenience unless there's a naming conflict.
 */
export type $SDRPKubeJSWrapper$Type = ($SDRPKubeJSWrapper);
/**
 * Global type exported for convenience, use class-specific
 * types if there's a naming conflict.
 */
declare global {
export type $SDRPKubeJSWrapper_ = $SDRPKubeJSWrapper$Type;
}}
declare module "packages/com/sunekaer/sdrp/integration/kubejs/$SDRPKubeJSIntegration$ClientDimensionChangeEvent" {
import {$EventJS, $EventJS$Type} from "packages/dev/latvian/mods/kubejs/event/$EventJS"
import {$Player, $Player$Type} from "packages/net/minecraft/world/entity/player/$Player"
import {$Level, $Level$Type} from "packages/net/minecraft/world/level/$Level"
import {$DimensionType, $DimensionType$Type} from "packages/net/minecraft/world/level/dimension/$DimensionType"

/**
 * This class is not allowed By KubeJS!
 * You should not load the class, or KubeJS will throw an error.
 * Loading the class using require() will not throw an error, but the class will be undefined.
 */
export class $SDRPKubeJSIntegration$ClientDimensionChangeEvent extends $EventJS {
 "dimensionType": $DimensionType
 "player": $Player
 "level": $Level

constructor(dimensionType: $DimensionType$Type, player: $Player$Type, level: $Level$Type)

public "updateSDRPState"(message: string, imageName: string, imageKey: string): void
}
/**
 * Class-specific type exported by ProbeJS, use global Type_
 * types for convenience unless there's a naming conflict.
 */
export type $SDRPKubeJSIntegration$ClientDimensionChangeEvent$Type = ($SDRPKubeJSIntegration$ClientDimensionChangeEvent);
/**
 * Global type exported for convenience, use class-specific
 * types if there's a naming conflict.
 */
declare global {
export type $SDRPKubeJSIntegration$ClientDimensionChangeEvent_ = $SDRPKubeJSIntegration$ClientDimensionChangeEvent$Type;
}}
