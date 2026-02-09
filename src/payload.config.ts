import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";

import { SEOGlobal } from './globals/SEO'
import { HeroGlobal } from './globals/Hero'
import { RoadMapGlobal } from './globals/RoadMap'
import { ProductsGlobal } from "./globals/Products";
import { AboutGlobal } from "./globals/About";
import { ContactsGlobal } from "./globals/Contacts";
import { FooterGlobal } from "./globals/Footer";
import { HeaderGlobal } from "./globals/Header";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  globals: [
    SEOGlobal,
    HeaderGlobal,
    FooterGlobal,
    HeroGlobal,
    RoadMapGlobal,
    ProductsGlobal,
    AboutGlobal,
    ContactsGlobal,
    
    
  ],
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || process.env.MONGODB_URI || "",
  }),
  sharp,
  plugins: [],
});
