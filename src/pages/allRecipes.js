import React, { useState } from 'react'
import ForumAd from '../components/Home/forumAd'
import ResultList from '../components/AllRecipes/resultList'
import Filter from '../components/AllRecipes/Filter/filter'

export default function AllRecipes() {
    const [filters, setFilters] = useState();

    const getFilters = (e) => setFilters(e)
    return (
        <section className="">
            <div className="container">
                <div className="card mb-3">
                    <div className="row g-0">
                        <div className="col-md-3">
                            <Filter getFilters={getFilters}/>
                        </div>
                        <div className="col-md-9">
                        
                            <div className="card-body">
                                <ResultList filters={filters}/>
                            </div>
                        </div>
                    </div>
                </div>
                <ForumAd/>
            </div>
        </section>
    )
}
