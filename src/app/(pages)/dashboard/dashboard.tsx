import BarVerticalServer from '@/app/components/organisme/chart/barVertical/BarVerticalServer';
import LineServer from '@/app/components/organisme/chart/line/LineServer';
import DonatServer from '@/app/components/organisme/chart/donat/DonatServer';
import ServerCard from '@/app/components/organisme/card/ServerCard';
import ServerList from '@/app/(pages)/dashboard/ServerList';

export async function ServerComponent() {

  return ( <div className={ " flex gap-2 flex-col p-2 sm:p-4 " }>
      <ServerList/>
      <div className="flex gap-2 sm:flex-row flex-col w-[100%]">
        <div className=" sm:w-[70%] gap-2 flex flex-col">
          <div className="border border-black bg-white rounded-3xl h-[20rem] sm:h-[100%] ">
            <LineServer/>
          </div>
          <div className="border border-black bg-white rounded-3xl h-[20rem] sm:h-[100%] ">
            <BarVerticalServer/>
          </div>
        </div>

        <div className="flex flex-col sm:w-[30%] gap-2">
          <div
            className="h-[60vw] sm:h-[30vw] overflow-y-auto border border-black bg-white rounded-3xl p-2">
            <ServerCard/>
          </div>
          <div className="  sm:h-[30vw]   border border-black bg-white rounded-3xl p-2">
            <DonatServer/>
          </div>
        </div>
      </div>
    </div>

  )
}

// export const product  = [
//   { nama: "Tahu Bakso Rebus", harga: 42.000 },
//   { nama: "Tahu Bakso Vakum", harga: 46.000 },
//   { nama: "Tahu Bakso Special", harga: 50.000 },
//   { nama: "Tahu Bakso Goreng", harga: 45.000 },
//   { nama: "Bandeng Presto", harga: 60.000 },
//   { nama: "Otak-Otak Bandeng", harga: 70.000 },
//   { nama: "Bakso Sapi 20", harga: 40.000 },
//   { nama: "Bakso Sapi 12", harga: 25.000 },
//   { nama: "Bakso Aneka", harga: 29.000 },
//   { nama: "Nugget", harga: 27.000 },
//   { nama: "Rolade Tahu", harga: 19.000 },
//   { nama: "Rolade Singkong", harga: 19.000 },
// ]
