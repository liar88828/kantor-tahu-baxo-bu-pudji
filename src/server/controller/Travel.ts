import RepoTravel from '../repository/Travel';
import Validation from '@/lib/validation/schema';
import type { TYPE } from '@/server/models/dataAccess/Travel';
import Service from '@/lib/validation/validation';

const Repo  = new RepoTravel()
const valid = new Validation()
const s     = Service
const find = async () => {
  const repo = await Repo.findAll()
  // console.log( "test Travel find" )
  return repo
}

const findById = async ( id: string ) => {
  const service = s.findById( valid.ZFindById( id ), id )
  const repo    = await Repo.findById( service )
  return repo
}

const create = async ( body: TYPE ) => {

  const validData = s.create( await valid.Input( body, valid.TravelSchema ), body )
  if( typeof validData === 'object' ) {
    return Repo.createOne( body )
  }
  return validData
}

const edit = async ( body: TYPE, id: string ) => {
  id              = s.findById( valid.ZFindById( id ), id )
  const validData = s.create( await valid.Input( body, valid.TravelSchema ), body )
  if( typeof validData === 'object' ) {
    return Repo.updateOne( body, id )
  }
  return validData
}

const destroy = async ( id: string ) => {
  id = s.findById( valid.ZFindById( id ), id )
  const repo = await Repo.destroyOne( id )
  return repo
}

const Control = { find, create, edit, destroy, findById }
export default Control