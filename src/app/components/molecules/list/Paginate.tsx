import React from 'react';

function Paginate( {} ) {
  return ( <div className=" flex justify-center mt-10">
      <div
        data-test="grid-item"
        className="join">
        <button className="join-item btn">«</button>
        <button className="join-item btn">1</button>
        <button className="join-item btn">2</button>
        <button className="join-item btn btn-disabled">...</button>
        <button className="join-item btn">99</button>
        <button className="join-item btn">100</button>
        <button className="join-item btn">»</button>
      </div>
    </div>
  );
}

export default Paginate;