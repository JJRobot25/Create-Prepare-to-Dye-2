//priority: 1
//Create Prepare to Dye 2 - Compacting Recipes

ServerEvents.recipes((event) => {
  // ORE - lapis lazuli from infusable dusts and water
  event.recipes.create.compacting("minecraft:lapis_lazuli", [
    "2x #forge:dusts/infusable",
    Fluid.water(500),
  ]);

  // ORE - redstone from nether wart block and mana dust
  event.recipes.create.compacting("minecraft:redstone", [
    "minecraft:nether_wart_block",
    "#forge:dusts/mana",
  ]);

  // ORE - diamond from coal blocks (superheated)
  event.recipes.create
    .compacting("minecraft:diamond", ["8x #forge:storage_blocks/coal"])
    .superheated();

  // ALLOY - gold block from ingots
  event.remove({ id: "minecraft:gold_block" });
  event.recipes.create.compacting("minecraft:gold_block", "9x minecraft:gold_ingot");

  // SLIME - slime block from terrasteel nuggets and honey
  event.recipes.create.compacting(
    "minecraft:slime_block",
    ["12x botania:terrasteel_nugget", Fluid.of("create:honey", 750)]
  );

  // DEAD PLANET - dirt from wood chips, sand, and clay ball
  event.recipes.create.compacting("minecraft:dirt", [
    "2x createdieselgenerators:wood_chip",
    "#forge:sand",
    "minecraft:clay_ball",
  ]);

  // DEAD PLANET - dirt from sticks and sand (75% chance)
  event.recipes.create.compacting(
    [Item.of("minecraft:dirt").withChance(0.75)],
    ["4x minecraft:stick", "2x #forge:sand"]
  );

  // DEAD PLANET - dirt from wood chips and clay
  event.recipes.create.compacting("2x minecraft:dirt", [
    "4x createdieselgenerators:wood_chip",
    "minecraft:clay",
  ]);
});
