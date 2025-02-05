import type { Faker } from "../mod.ts";

/**
 * @namespace unsplash
 * @memberof faker.image
 */
class Unsplash {
  faker: Faker;
  categories: string[];

  constructor(faker: Faker) {
    this.faker = faker;
    this.categories = [
      "food",
      "nature",
      "people",
      "technology",
      "objects",
      "buildings",
    ];
  }

  /**
   * image
   *
   * @param {number} width
   * @param {number} height
   * @param {string} keyword
   * @method faker.image.unsplash.image
   * @description search image from unsplash
   * @returns {string}
   */
  image(width: number, height: number, keyword: string): string {
    return this.imageUrl(width, height, undefined, keyword);
  }

  /**
   * avatar
   *
   * @method faker.image.unsplash.avatar
   * @returns {string}
   */
  avatar(): string {
    return this.faker.internet.avatar();
  }

  /**
   * imageUrl
   *
   * @param {number} width
   * @param {number} height
   * @param {string | undefined} category
   * @param {string} keyword
   * @method faker.image.unsplash.imageUrl
   * @returns {string}
   */
  imageUrl(
    width: number,
    height: number,
    category: string | undefined,
    keyword: string,
  ): string {
    width = width || 640;
    height = height || 480;

    let url = "https://source.unsplash.com";

    if (typeof category !== "undefined") {
      url += "/category/" + category;
    }

    url += "/" + width + "x" + height;

    if (typeof keyword !== "undefined") {
      const keywordFormat = new RegExp(
        "^([A-Za-z0-9].+,[A-Za-z0-9]+)$|^([A-Za-z0-9]+)$",
      );
      if (keywordFormat.test(keyword)) {
        url += "?" + keyword;
      }
    }

    return url;
  }

  /**
   * food
   *
   * @param {number} width
   * @param {number} height
   * @param {string} keyword
   * @method faker.image.unsplash.food
   * @returns {string}
   */
  food(width: number, height: number, keyword: string): string {
    return this.faker.image.unsplash.imageUrl(width, height, "food", keyword);
  }

  /**
   * people
   *
   * @param {number} width
   * @param {number} height
   * @param {string} keyword
   * @method faker.image.unsplash.people
   * @returns {string}
   */
  people(width: number, height: number, keyword: string): string {
    return this.faker.image.unsplash.imageUrl(
      width,
      height,
      "people",
      keyword,
    );
  }

  /**
   * nature
   *
   * @param {number} width
   * @param {number} height
   * @param {string} keyword
   * @method faker.image.unsplash.nature
   * @returns {string}
   */
  nature(width: number, height: number, keyword: string): string {
    return this.faker.image.unsplash.imageUrl(
      width,
      height,
      "nature",
      keyword,
    );
  }

  /**
   * technology
   *
   * @param {number} width
   * @param {number} height
   * @param {string} keyword
   * @method faker.image.unsplash.technology
   * @returns {string}
   */
  technology(width: number, height: number, keyword: string): string {
    return this.faker.image.unsplash.imageUrl(
      width,
      height,
      "technology",
      keyword,
    );
  }

  /**
   * objects
   *
   * @param {number} width
   * @param {number} height
   * @param {string} keyword
   * @method faker.image.unsplash.objects
   * @returns {string}
   */
  objects(width: number, height: number, keyword: string): string {
    return this.faker.image.unsplash.imageUrl(
      width,
      height,
      "objects",
      keyword,
    );
  }

  /**
   * buildings
   *
   * @param {number} width
   * @param {number} height
   * @param {string} keyword
   * @method faker.image.unsplash.buildings
   * @returns {string}
   */
  buildings(width: number, height: number, keyword: string): string {
    return this.faker.image.unsplash.imageUrl(
      width,
      height,
      "buildings",
      keyword,
    );
  }
}

export { Unsplash };
