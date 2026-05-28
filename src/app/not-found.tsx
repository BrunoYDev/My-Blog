// src/app/not-found.tsx
import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.bsodContainer}>
      <div className={styles.content}>
        <p className={styles.errorCode}>
          <span>ERROR</span>
        </p>
        <p>Uma exceção fatal 404 ocorreu em 0028:C0011E36 no VXD VMM(01) + 00010E36.</p>
        <p>A página solicitada não foi encontrada na memória do servidor. Ela pode ter sido movida, excluída ou talvez esteja se escondendo em outro castelo.</p>
        <br />
        <p>* Pressione qualquer tecla para encerrar a aplicação atual.</p>
        <p>* Pressione CTRL+ALT+DEL para reiniciar o navegador. Você perderá qualquer dado não salvo em todos os aplicativos.</p>
        <p>* Ou, tente uma solução menos dramática:</p>
        <br/>
        <p className={styles.returnLinkContainer}>
          <Link href="/" className={styles.returnLink}>
            &gt; Voltar para o início
          </Link>
          <span className={styles.blinkingCursor}>_</span>
        </p>
      </div>
    </div>
  );
}
