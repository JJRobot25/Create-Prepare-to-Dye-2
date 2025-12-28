//priority: 0
// EMI Info Page Generation - auto-generates EMI info recipes for items with .emi.info translations

ClientEvents.lang("en_us", function(event) {
  var infoPages = {};
  var itemIds = Ingredient.all.itemIds.toArray();

  for (var i = 0; i < itemIds.length; i++) {
    var id = itemIds[i];
    var key = Item.of(id).descriptionId + ".emi.info";
    var translated = Text.translate(key).string;

    if (translated !== key) {
      infoPages[id] = {
        type: "emi:info",
        stacks: ["item:" + id],
        text: key
      };
    }
  }

  var pageIds = Object.keys(infoPages);
  for (var i = 0; i < pageIds.length; i++) {
    var id = pageIds[i];
    var filename = "kubejs/assets/emi/recipe/additions/generated." + id.replace(":", ".") + ".json";
    JsonIO.write(filename, infoPages[id]);
  }

  console.info("[EMI] Generated " + pageIds.length + " info pages");
});
