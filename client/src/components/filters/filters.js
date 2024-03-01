// import React, { useState } from 'react';

// const Filters = ({leases}) => {
//     const [filter, setFilter] = useState('all');
//     const [searchTerm, setSearchTerm] = useState('');

//     const filteredCards = leases.filter(lease => {
//         return lease.city.toLowerCase().includes(searchTerm.toLowerCase());

//     });

//     return (
//         <div class="dropdown">
//             <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//                 Filters
//             </button>
//             <ul class="dropdown-menu">
//                 <li>
//                     <button
//                         className="btn-dark text-white p-1 px-2 mx-5 btn fw-bold"
//                         onClick={() => setFilter("city")}
//                     >Action</button></li>
//                 <li><a class="dropdown-item" href="#">Another action</a></li>
//                 <li><a class="dropdown-item" href="#">Something else here</a></li>
//             </ul>
//         </div>

//     )


// }