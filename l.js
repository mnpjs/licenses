import { writeFileSync } from 'fs'
import licenses from './list'

Object.entries(licenses).forEach(([k, l]) => {
  l.spdx = l.spdx || "-"
})
writeFileSync('list.json', JSON.stringify(licenses, null, 2))