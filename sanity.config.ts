import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { structure } from './sanity/structure'

export default defineConfig({
  name: 'kidzofi',
  title: 'KidZoFi Store',

  projectId: 'li7v7pl2',
  dataset: 'production',

  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
