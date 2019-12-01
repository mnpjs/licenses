import GitHub from '@rqt/github'
import token from './.token'
import rqt from 'rqt'
import { writeFileSync, existsSync } from 'fs'
import { join } from 'path'
// https://help.github.com/en/github/creating-cloning-and-archiving-repositories/licensing-a-repository#searching-github-by-license-type
import licenses from './list'

(async () => {
  const github = new GitHub(token)
  // const l = { 'afl-3.0': 1 }
  Object.keys(licenses).reduce(async (acc, name) => {
    await acc
    const output = join('licenses', `${name}.txt`)
    if (existsSync(output)) return acc
    console.log('Fetching %s license', name)
    const n = `license-${name}`
    try {
      await github.repos.create({
        name: n,
        license_template: name,
      })
      const l = await rqt(`https://raw.githubusercontent.com/zavr-1/${n}/master/LICENSE`)
      writeFileSync(output, l)
      await github.repos.delete('zavr-1', n)
    } catch (err) {
      console.log(err.message)
    }
  }, {})
})()