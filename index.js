import ExtractorSvc from './ExtractorSvc'
import Forge from 'forge-apis'
import rmdir from 'rmdir'
import path from 'path'
import 'babel-polyfill'

const getToken = () => {

  return new Promise((resolve, reject) => {

    const oAuth2TwoLegged = new Forge.AuthClientTwoLegged(
      process.env.FORGE_DEV_CLIENT_ID,
      process.env.FORGE_DEV_CLIENT_SECRET,
      ['viewables:read'])

    oAuth2TwoLegged.authenticate().then ((token) => {

      resolve (token)

    }, (error) => {

      reject (error)
    })
  })
}

const extract = async () => {

  try {

    const extractorSvc = new ExtractorSvc()

    const name = 'MyForgeModel'

    const urn = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bGVlZnNtcC1mb3JnZS1kZXYvUG5JRC5ud2Q='

    const token = await getToken()

    const dir = path.resolve(__dirname, 'robot')

    const files = await extractorSvc.download(
      getToken, urn, dir)

    const zipfile = dir + '.zip'

    await extractorSvc.createZip(
      dir, zipfile, name, files)

    rmdir(dir)

  } catch (ex) {

    console.log(ex)
  }
}

extract()