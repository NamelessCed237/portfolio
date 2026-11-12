import { useEffect, useState } from "react";
import { Trash2, Loader2, Mail, MailOpen } from "lucide-react";
import { api } from "@/lib/api";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

const AdminMessages = () => {
  const [list, setList] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      setList(await api.get<Message[]>("/messages/admin/all"));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Chargement impossible");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const toggleRead = async (m: Message) => {
    try {
      await api.put(`/messages/${m.id}/read`, { read: !m.read });
      setList((l) => l.map((x) => (x.id === m.id ? { ...x, read: !m.read } : x)));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Action impossible");
    }
  };

  const remove = async (m: Message) => {
    if (!confirm("Supprimer ce message ?")) return;
    try {
      await api.del(`/messages/${m.id}`);
      setList((l) => l.filter((x) => x.id !== m.id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Suppression impossible");
    }
  };

  const unread = list.filter((m) => !m.read).length;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-sm text-muted-foreground">{list.length} message(s) · {unread} non lu(s)</p>
      </div>
      {error && <p className="mb-4 text-sm text-destructive">{error}</p>}
      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Chargement…</div>
      ) : list.length === 0 ? (
        <p className="text-muted-foreground">Aucun message.</p>
      ) : (
        <div className="space-y-2">
          {list.map((m) => (
            <div key={m.id} className={`card-surface p-4 ${m.read ? "" : "border-primary/40"}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="flex items-center gap-2 font-semibold">
                    {!m.read && <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />}
                    {m.name}
                  </p>
                  <a href={`mailto:${m.email}`} className="text-sm link-accent">{m.email}</a>
                </div>
                <div className="flex items-center gap-1">
                  <span className="mr-1 text-xs text-muted-foreground">{new Date(m.createdAt).toLocaleDateString()}</span>
                  <button onClick={() => toggleRead(m)} title={m.read ? "Marquer non lu" : "Marquer lu"} className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground">
                    {m.read ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                  </button>
                  <button onClick={() => remove(m)} className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm text-muted-foreground">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
