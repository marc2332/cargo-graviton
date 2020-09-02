import * as toml from 'toml'
const fs = window.require('fs-extra')
import { join } from 'path'
import { EntryContext } from '@gveditor/sdk/types'

export const entry = ({ RunningConfig }: EntryContext) =>{
	RunningConfig.data.envs.push({
		name: 'Cargo',
		filter(dir: string){
			return new Promise(async (resolve, reject) => {
				if (await fs.exists(join(dir, 'Cargo.toml'))) {
					const cargoToml = await fs.readFile(join(dir, 'Cargo.toml'), 'UTF-8')
					const cargoJSON = await toml.parse(cargoToml) 
					return resolve(cargoJSON)
				}
				return reject()
			})
		}
	})
}
