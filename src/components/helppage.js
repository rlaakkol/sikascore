import React from 'react'
import marked from 'marked'

const helpText = `
Foobar
`

const HelpPage = () => (
  <div
    className="helptext"
    dangerouslySetInnerHTML={{ __html: marked(helpText, { sanitize: true }) }}
  />
)

export default HelpPage
