import fs from 'node:fs'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const pkgPath = path.resolve(__dirname, '../../packages')
const distPath = path.resolve(__dirname, '../../dist/node_modules')

export function resolvePkgPath(pkgName, isDist) {
  if (isDist) {
    return `${distPath}/${pkgName}`
  }

  return `${pkgPath}/${pkgName}`
}

export function getPackageJSON(pkgName) {
  const path = `${resolvePkgPath(pkgName)}/package.json`
  const str = fs.readFileSync(path, { encoding: 'utf-8' })
  return JSON.parse(str)
}
