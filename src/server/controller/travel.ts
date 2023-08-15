import RepoTravel from '../repository/travel';
import Validation from '@/lib/validation/schema';
import Service from '@/server/service/travel';
import type { TYPE } from '@/server/models/dataAccess/Travel';

const Repo  = new RepoTravel()
const valid = new Validation()

const find = async () => {
  const repo = await Repo.findAll()
  // console.log( "test Travel find" )
  return repo
}

const findById = async ( id: string ) => {
  const service = Service.findById( valid.ZFindById( id ), id )
  const repo    = await Repo.findById( service )
  return repo
}

const create = async ( body: TYPE ) => {

  const validData = Service.create( await valid.Input( body, valid.TravelSchema ), body )
  if( typeof validData === 'object' ) {
    return Repo.createOne( body )
  }
  return validData
}

const edit = async ( body: TYPE, id: string ) => {
  id              = Service.findById( valid.ZFindById( id ), id )
  const validData = Service.create( await valid.Input( body, valid.TravelSchema ), body )
  if( typeof validData === 'object' ) {
    return Repo.updateOne( body, id )
  }
  return validData
}

const destroy = async ( id: string ) => {
  id         = Service.findById( valid.ZFindById( id ), id )
  const repo = await Repo.destroyOne( id )
  return repo
}

const Control = { find, create, edit, destroy, findById }
export default Control