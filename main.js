import toml from 'toml'
const fs = window.require('fs-extra')
import { join } from 'path'

function entry({
	RunningConfig
}){
	RunningConfig.data.envs.push({
		name: 'Cargo',
		filter(dir){
			return new Promise(async (resolve, reject) => {
				if (fs.existsSync(join(dir, 'Cargo.toml'))) {
					const cargoToml = await fs.readFile(join(dir, 'Cargo.toml'),'UTF-8')
					const cargoJSON = await toml.parse(cargoToml) 
					return resolve(cargoJSON)
				}
				return reject()
			})
		}
	})
}
module.exports = {
	entry
}