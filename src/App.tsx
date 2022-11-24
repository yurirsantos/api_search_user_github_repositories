import React, { useState, useEffect } from 'react'
import api from './api'
import { Input } from './components/inputs/input'

export function App() {
  const [initialRepositories, setInitialRepositories] = useState([])
  const [repositories, setRepositories] = useState([])
  const [userGitHub, setUserGitHub] = useState('')

  function handleUserGitHub(nameUserGitHub: { target: { value: string } }) {
    let value = nameUserGitHub.target.value

    setUserGitHub(value)
  }

  function searchRepositories() {
    api
      .get(`/${userGitHub}/repos`)
      .then(response => {
        const res = response.data
        if (res.length <= 0) {
          alert('User without repositories')
        } else {
          setInitialRepositories(response.data)
          setRepositories(response.data)
        }
      })
      .catch(error => {
        if (!userGitHub) {
          alert('Report a user!')
        } else {
          alert('User not found!')
        }
      })
  }

  function handleRepositoryName(repositoryName: { target: { value: string } }) {
    let nameRepository = repositoryName.target.value

    if (!nameRepository) {
      setRepositories(initialRepositories)
    } else {
      let filterRepositories = repositories.filter(getRepositories)

      function getRepositories(value: any) {
        return value.name.includes(nameRepository)
      }

      setRepositories(filterRepositories)
    }
  }

  return (
    <>
      <header>
        <div className="bg-gray-500 w-1/2 m-auto text-center rounded-b-md">
          <Input
            id="userGitHub"
            name="userGitHub"
            label="User GitHub"
            placeholder="User GitHub"
            onChange={handleUserGitHub}
          />

          <button
            className="bg-gray-800 text-white p-2 rounded-md scale-90 hover:scale-100 hover:bg-gray-600"
            onClick={searchRepositories}
          >
            Search
          </button>
        </div>
      </header>

      <main>
        {repositories.length > 0 ? (
          <div className="bg-gray-500 w-1/2 m-auto text-center rounded-md mt-10">
            <Input
              id="repositoryName"
              name="repositoryName"
              label="Repository Name"
              placeholder="Repository Name"
              onChange={handleRepositoryName}
            />
          </div>
        ) : (
          <></>
        )}

        <ul className="p-5">
          {repositories.map(repository => {
            return (
              <div className="bg-gray-400 w-1/2 m-auto text-center rounded-md mt-5 mb-5 p-5 justify-between flex items-center">
                <li
                  key={repository.id}
                  className="font-bold text-3xl text-white "
                >
                  {repository.name}
                </li>

                <a
                  href={repository.html_url}
                  target="_blanck"
                  className="text-white p-3 text-2xl bg-gray-700 hover:bg-gray-600 rounded-md"
                >
                  Access
                </a>
              </div>
            )
          })}
        </ul>
      </main>
    </>
  )
}
