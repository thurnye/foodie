import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Video } from 'react-feather';


import RecentRecipeList from './recentRecipeList';
import LatestRecipesList from './latestRecipesList';
import Category from './category';
import NewsLetter from './newsLetter';
import AppAdvert from './appAdvert';
import MySocialMedia from './mySocialMedia';
import UtubeAdvert from './utube'
import Headings from '../../UI/heading'
export default function recentRecipe() {
    return (
        <>
             <section className="recent-recipe">
            <div className="container">
                <Headings title="Recent recipes"/>
            </div>
            <div className="recipes container">
                    <div className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-8 recipes-card-container">
                                <RecentRecipeList />
                                
                            </div>
                            <div className="col-md-4 ">
                                <Category />
                                <NewsLetter />
                                <LatestRecipesList />
                                <AppAdvert />
                                <MySocialMedia />
                                <UtubeAdvert />
                            </div>
                        </div>
                    </div>
            </div>
            </section>
            
            
        </>
    )
}
