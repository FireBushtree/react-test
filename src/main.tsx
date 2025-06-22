import { createRoot } from 'react-dom/client'

const demoJsx = (
  <div key="test" ref="test">123</div>
)

createRoot(document.getElementById('root') as HTMLElement).render(
  demoJsx,
)
