import RepoTravel from '../repository/travel';
import { TYPE }   from '@/server/models/dataAccess/Travel';
import Validation from '@/lib/validation/schema';
import Service    from '@/server/service/travel';

const Repo  = new RepoTravel()
const valid = new Validation()

const find = async () => {
  const repoTravel = await Repo.findAll()
  // console.log( "test Travel find" )
  return repoTravel
}

const findById = async ( id: string ) => {
  const service    = Service.findById( valid.ZFindById( id ), id )
  const repoTravel = await Repo.findById( service )
  return repoTravel
}

const create   = async ( body: TYPE ) => {
  body = Service.create( valid.TravelInput( body, valid.TravelSchema ), body )
  const repoTravel = await Repo.create( body )
  return repoTravel
}

const edit     = async ( body: TYPE, id: string ) => {
  id               = Service.findById( valid.ZFindById( id ), id )
  body             = Service.create( valid.TravelInput( body, valid.TravelSchema ), body )
  const repoTravel = await Repo.update( body, id )
  // console.log( repoTravel )
  return repoTravel
}

const destroy  = async ( id: string ) => {
  id               = Service.findById( valid.ZFindById( id ), id )
  const repoTravel = await Repo.destroy( id )
  // console.log( repoTravel )
  return repoTravel
}

const Control  = { find, create, edit, destroy, findById }
export default Control