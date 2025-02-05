import { Fake } from "./fake.ts";
import { Unique } from "./unique.ts";
import { Random } from "./random.ts";
import { Helpers } from "./helpers.ts";
import { Name } from "./name.ts";
import { Address } from "./address.ts";
import { Company } from "./company.ts";
import { Finance } from "./finance.ts";
import { Image } from "./image.ts";
import { Lorem } from "./lorem.ts";
import { Hacker } from "./hacker.ts";
import { Internet } from "./internet.ts";
import { Database } from "./database.ts";
import { Phone } from "./phone_number.ts";
import { _Date } from "./date.ts";
import { Commerce } from "./commerce.ts";
import { System } from "./system.ts";
import { Git } from "./git.ts";
import { Vehicle } from "./vehicle.ts";
import type { Definitions, Locale } from "./types.d.ts";

/**
 * Main Faker class
 * @namespace faker
 */
class Faker {
  opts: Record<string, unknown>;
  locales: Record<string, Locale>;
  locale: string;
  localeFallback: string;

  fake: Fake["fake"];
  unique: Unique["unique"];
  random: Random;
  helpers: Helpers;
  name: Name;
  address: Address;
  company: Company;
  finance: Finance;
  image: Image;
  lorem: Lorem;
  hacker: Hacker;
  internet: Internet;
  database: Database;
  phone: Phone;
  date: _Date;
  commerce: Commerce;
  system: System;
  git: Git;
  vehicle: Vehicle;

  definitions: Definitions;
  _definitions: {
    [key: string]: string[] | string;
  };
  seedValue?: number | number[];

  /**
   * Constructor for the Faker class
   * @param {Record<string, unknown>} opts - Options for the Faker instance
   */
  constructor(opts: Record<string, unknown>) {
    this.opts = opts || {};
    // assign options
    this.locales = (opts.locales as Record<string, Locale>) || {};
    this.locale = typeof opts.locale === "string" ? opts.locale : "en";
    this.localeFallback = typeof opts.localeFallback === "string"
      ? opts.localeFallback
      : "en";

    this.definitions = {} as Definitions;

    this.fake = new Fake(this).fake;
    this.unique = new Unique(this).unique;
    this.random = new Random(this);
    this.helpers = new Helpers(this);
    this.name = new Name(this);
    this.address = new Address(this);
    this.company = new Company(this);
    this.finance = new Finance(this);
    this.image = new Image(this);
    this.lorem = new Lorem(this);
    this.hacker = new Hacker(this);
    this.internet = new Internet(this);
    this.database = new Database(this);
    this.phone = new Phone(this);
    this.date = new _Date(this);
    this.commerce = new Commerce(this);
    this.system = new System(this);
    this.git = new Git(this);
    this.vehicle = new Vehicle(this);

    this._definitions = {
      "name": [
        "first_name",
        "last_name",
        "prefix",
        "suffix",
        "gender",
        "title",
        "male_prefix",
        "female_prefix",
        "male_first_name",
        "female_first_name",
        "male_middle_name",
        "female_middle_name",
        "male_last_name",
        "female_last_name",
      ],
      "address": [
        "city_prefix",
        "city_suffix",
        "street_suffix",
        "county",
        "country",
        "country_code",
        "state",
        "state_abbr",
        "street_prefix",
        "postcode",
        "postcode_by_state",
        "direction",
        "direction_abbr",
      ],
      "company": [
        "adjective",
        "noun",
        "descriptor",
        "bs_adjective",
        "bs_noun",
        "bs_verb",
        "suffix",
      ],
      "lorem": ["words"],
      "hacker": [
        "abbreviation",
        "adjective",
        "noun",
        "verb",
        "ingverb",
        "phrase",
      ],
      "phone_number": ["formats"],
      "finance": [
        "account_type",
        "transaction_type",
        "currency",
        "iban",
        "credit_card",
      ],
      "internet": [
        "avatar_uri",
        "domain_suffix",
        "free_email",
        "example_email",
        "password",
      ],
      "commerce": [
        "color",
        "department",
        "product_name",
        "price",
        "categories",
      ],
      "database": ["collation", "column", "engine", "type"],
      "system": ["mimeTypes", "directoryPaths"],
      "date": ["month", "weekday"],
      "vehicle": [
        "vehicle",
        "manufacturer",
        "model",
        "type",
        "fuel",
        "vin",
        "color",
      ],
      "title": "",
      "separator": "",
    };

    // Create a Getter for all definitions.foo.bar properties
    Object.keys(this._definitions).forEach((d) => {
      if (typeof this.definitions[d] === "undefined") {
        this.definitions[d] = {};
      }

      if (typeof this._definitions[d] === "string") {
        this.definitions[d] = this._definitions[d];
        return;
      }

      if (Array.isArray(this._definitions[d])) {
        const defsArray = [...this._definitions[d] as string[]];

        defsArray.forEach((p: string) => {
          Object.defineProperty(this.definitions[d], p, {
            get: () => {
              if (
                typeof (this.locales[this.locale][d] as Record<
                    string,
                    unknown
                  >)[p] === "undefined" ||
                typeof (this.locales[this.locale][d] as Record<
                    string,
                    unknown
                  >)[p] === "undefined"
              ) {
                // certain localization sets contain less data then others.
                // in the case of a missing definition, use the default localeFallback to substitute the missing set data
                // throw new Error('unknown property ' + d + p)
                return (this.locales[this.localeFallback][d] as Record<
                  string,
                  unknown
                >)[p];
              } else {
                // return localized data
                return (this.locales[this.locale][d] as Record<
                  string,
                  unknown
                >)[p];
              }
            },
          });
        });
      }
    });
  }

  setLocale(locale: string) {
    this.locale = locale;
  }

  seed(value: number) {
    this.seedValue = value;
    this.random = new Random(this, this.seedValue);
  }
}

export { Faker };
