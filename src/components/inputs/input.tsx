import React from 'react'

type typesInput = {
  label: string
  id: string
  name: string
  placeholder: string
  onChange: any
}

export function Input(props: typesInput) {
  return (
    <>
      <label className="text-white">{props.label}</label>
      <input
        id={props.id}
        name={props.name}
        className="bg-white h-9 m-5 p-4 border-2 border-black rounded-md"
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </>
  )
}
