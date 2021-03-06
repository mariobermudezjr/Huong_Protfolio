import React, { Component } from 'react'
import "./Modals.css"
import { css } from '@emotion/core';
import { RiseLoader } from 'react-spinners';
import ProjectItem from './ProjectItem';

const override = css`
    display: block;
    margin: 0 auto;
`;

export default class ProjectContainer extends Component {
    constructor(){
        super();
        this.state = {projects: null, isLoading: true}
    }

    async getData() {
        const token = '02cf288fbfaa8c9b64f01ac46ec609f521b1539f91a46621395b63cfb065504b'
        const url = `https://api.netlify.com/api/v1/sites?access_token=${token}`
        try {
            let response = await fetch(url)
            let json = await response.json()
            console.log(json)
            this.setState({projects : json, isLoading: false})
            }
            catch(err) {console.log(err)}           
    }

    async componentDidMount() {
        this.getData()
    }
  render() {
      const {isLoading, projects} = this.state
      let selectedProjects = []
      if(projects) {
        selectedProjects = projects.filter((project) => project.name.slice(0,7) === 'project')
      }
    return (
      <ul className="list-unstyled scrolling-box">
        { isLoading ? <h4 className="text-center mt-5">
        <RiseLoader
          css={override}
          sizeUnit={"px"}
          size={18}
          color={'#00C7D9'}
          loading={isLoading}
        />
        </h4> :
         selectedProjects.map( project =>
         <ProjectItem project={project} key={project.name} />
         )
        }
      </ul>
    )
  }
}
