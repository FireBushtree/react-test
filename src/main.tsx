import { createRoot } from 'react-dom/client'

const demoJsx = (
  <div key="test" ref="test">
    <span>
      <p>hello owen</p>
    </span>
  </div>
)

createRoot(document.getElementById('root') as HTMLElement).render(
  demoJsx,
)
