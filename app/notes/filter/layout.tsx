type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const NotesLayout = ({ children, sidebar }: Props) => {
  return (
    <section style={{ display: "flex" }}>
      <aside style={{ width: "220px" }}>{sidebar}</aside>
      <div style={{ flex: 1, padding: "16px" }}>{children}</div>
    </section>
  );
};

export default NotesLayout;
