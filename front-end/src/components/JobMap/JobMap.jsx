import Occupation from "../Occupation/Occupation";
import "./JobMap.css";
import {useMemo} from "react";

function JobMap({ onJobInfoClick }) {

    const categoriesWithJobs = useMemo(() => ([
        {
            category: {
                id: 'util',
                label: 'Utilities & Grid Modernization',
                cssClass: 'category__1',
            },
            jobs: [
                {
                    label: 'Job 1',
                    id: 'job-1',
                }
            ]
        },
        {
            category: {
                id: 'energy',
                label: 'Renewable Energy Systems',
                cssClass: 'category__2',
            },
            jobs: [
                {
                    label: 'Job 2',
                    id: 'job-2',
                }
            ]
        },
        {
            category: {
                id: 'residential',
                label: 'Residential & Commercial Construction',
                cssClass: 'category__3',
            },
            jobs: [
                {
                    label: 'Job 3',
                    id: 'job-3',
                }
            ]
        },
        {
            category: {
                id: 'systems',
                label: 'Building Operations Systems',
                cssClass: 'category__4',
            },
            jobs: [
                {
                    label: 'Job 4',
                    id: 'job-4',
                }
            ]
        },
        {
            category: {
                id: 'hvac',
                label: 'HVAC/R & Product Distribution',
                cssClass: 'category__5',
            },
            jobs: [
                {
                    label: 'Job 5',
                    id: 'job-5',
                },
                {
                    label: 'Job 6',
                    id: 'job-6',
                },
                {
                    label: 'Job 7',
                    id: 'job-7',
                }
            ]
        }
    ]), [])

  return (
    <div className="map">
        {categoriesWithJobs.map(categoryWithJobs => (
            <div className={"category " + categoryWithJobs.category.cssClass} key={categoryWithJobs.category.id}>
                <h3 className="category__title">{categoryWithJobs.category.label}</h3>
                {categoryWithJobs.jobs.map(job => (
                    <Occupation onJobInfoClick={onJobInfoClick} value={job.id} key={job.id}>
                        {job.label}
                    </Occupation>
                ))}
            </div>
        ))}
    </div>
  );
}

export default JobMap;
