import { ReactNode } from "react";

export default function KeystaticLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "2rem",
      height: "100%"
    }}>
      {/* Editor à esquerda */}
      <div style={{ overflow: "auto" }}>
        {children}
      </div>
      
      {/* Preview à direita */}
      <div style={{ 
        overflow: "auto",
        backgroundColor: "#f5f5f5",
        padding: "2rem",
        borderLeft: "1px solid #ddd"
      }}>
        <div style={{
          textAlign: "center",
          color: "#999",
          paddingTop: "2rem"
        }}>
          <p>Preview será exibida aqui quando você salvar o post</p>
        </div>
      </div>
    </div>
  );
}
