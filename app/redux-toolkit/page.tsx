import { Main } from './components/main';
import { ProviderWrapper } from './provider';

export default function Page() {
  return (
    <ProviderWrapper>
      <Main />
    </ProviderWrapper>
  );
}
