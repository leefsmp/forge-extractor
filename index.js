import ExtractorSvc from './ExtractorSvc'
import rmdir from 'rmdir'
import path from 'path'


const getToken = () => {

  return new Promise((resolve, reject) => {

    const oAuth2TwoLegged = new Forge.AuthClientTwoLegged(
      process.env.FORGE_CLIENT_ID,
      process.env.FORGE_CLIENT_SECRET,
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

    const urn = 'URN OF YOUR MODEL'

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