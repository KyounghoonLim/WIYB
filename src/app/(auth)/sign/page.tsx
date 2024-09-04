import Form_Sign from 'components/form/Form_Sign'
import { PATH } from 'constants/path.constant'

export default function SignPage({ searchParams: { path } }) {
  return (
    <main className="PAGE-CONTAINER">
      <Form_Sign fallback={atob(path || '') || PATH.MAIN} />
    </main>
  )
}
