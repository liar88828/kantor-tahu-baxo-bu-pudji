import RepoTravel from '../repository/travel';
import Validation from '@/lib/validation/schema';
import Service    from '@/server/service/travel';
import type { TYPE } from '@/server/models/dataAccess/Travel';

const Repo  = new RepoTravel()
const valid = new Validation()

const find = async () => {
  const repo = await Repo.findAll()
  // console.log( "test Travel find" )
  return repo
}

const findById = async ( id: string ) => {
  const service    = Service.findById( valid.ZFindById( id ), id )
  const repo       = await Repo.findById( service )
  return repo
}

const create   = async ( body: TYPE ) => {

  body       = Service.create( valid.Input( body, valid.TravelSchema ), body )
  const repo = await Repo.createOne( body )
  return repo
}

const edit     = async ( body: TYPE, id: string ) => {
  id               = Service.findById( valid.ZFindById( id ), id )
  body             = Service.create( valid.Input( body, valid.TravelSchema ), body )
  const repo       = await Repo.updateOne( body, id )
  // console.log( repo )
  return repo
}

const destroy  = async ( id: string ) => {
  id               = Service.findById( valid.ZFindById( id ), id )
  const repo       = await Repo.destroy( id )
  return repo
}

const Control  = { find, create, edit, destroy, findById }
export default Control