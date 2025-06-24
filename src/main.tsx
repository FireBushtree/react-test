import { createRoot } from 'react-dom/client'

const demoJsx = (
  <div key="test" ref="test">
    <span>
      owen
    </span>
  </div>
)

createRoot(document.getElementById('root') as HTMLElement).render(
  demoJsx,
)
