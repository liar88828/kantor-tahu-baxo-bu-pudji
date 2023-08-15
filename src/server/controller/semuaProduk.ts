import Validation from '@/lib/validation/schema';
import type { TYPE } from '@/server/models/dataAccess/semuaProduk';
import Service from '@/server/service/semuaProduk';
import RepoSemuaProduk from '@/server/repository/semuaProduk';

const Repo      = new RepoSemuaProduk()
const valid     = new Validation()
const serviceSP = new Service()

const find = async () => {
  const repo = await Repo.findAll()
  return repo
}

const findById = async ( id: string ) => {
  const service = serviceSP.findById( valid.ZFindById( id ), id )
  const repo    = await Repo.findById( service )
  return repo
}

const create = async ( body: TYPE, id: string ) => {
  id              = serviceSP.findById( valid.ZFindById( id ), id )
  const validData = serviceSP.create( await valid.Input( body, valid.semuaProduk ), body )
  if( typeof validData === 'object' ) {
    return Repo.createOne( body, id )
  }
  return validData
}

const edit = async ( body: TYPE, id: string ) => {
  id              = serviceSP.findById( valid.ZFindById( id ), id )
  const validData = serviceSP.create( await valid.Input( body, valid.semuaProduk ), body )
  if( typeof validData === 'object' ) {
    return Repo.updateOne( body, id )
  }
  return validData
}

const destroy = async ( id: string ) => {
  id         = serviceSP.findById( valid.ZFindById( id ), id )
  const repo = await Repo.destroyOne( id )
  // console.log( repo )
  return repo
}

const Control = { find, create, edit, destroy, findById }
export default Control