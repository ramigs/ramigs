const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {

    // Layout aliases can make templates more portable
    eleventyConfig.addLayoutAlias('default', 'layouts/base.njk');

    // blogpost collection
    eleventyConfig.addCollection("posts", function (collection) {
        return collection.
                    getFilteredByGlob("./src/site/posts/*.md")
                    .filter((item) => {
                        return 'date' in item.data;
        });
    });

    // Add some utility filters
    //eleventyConfig.addFilter("squash", require("./src/filters/squash.js"));
    eleventyConfig.addFilter("dateDisplay", (dateObj, format = "LLLL d, y") => {
        return DateTime.fromJSDate(dateObj, {
            zone: "utc"
        }).toFormat(format);
    });

    // minify the html output
    //eleventyConfig.addTransform("htmlmin", require("./src/utils/minify-html.js"));

    // pass some assets right through
    // eleventyConfig.addPassthroughCopy("./src/assets/img");

    return {
        templateFormats: ["njk", "md"],
        passthroughFileCopy: true,
        dir: {
            input: "src/site",
            output: "dist"
        }
    };
};