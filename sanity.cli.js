import { defineCliConfig } from 'sanity/cli'

/**
 * Configuración del CLI de Sanity
 * Usado para comandos como: sanity deploy, sanity cors, etc.
 */

export default defineCliConfig({
  api: {
    projectId: '5h1fblp5',
    dataset: 'production'
  }
})
