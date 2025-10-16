import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MoreVertical, 
  FileText, 
  Edit, 
  Trash2,
  MessageSquare 
} from 'lucide-react';
import { useState } from 'react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  lastContact: string;
  avatar?: string;
}

interface ContactCardProps {
  contact: Contact;
  index: number;
}

export default function ContactCard({ contact, index }: ContactCardProps) {
  const [showActions, setShowActions] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setShowActions(true)}
      onHoverEnd={() => setShowActions(false)}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all hover:border-cyan-500/30 hover:bg-white/10"
    >
      {/* Background Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-blue-500/0 opacity-0 transition-opacity group-hover:opacity-10" />

      <div className="relative flex items-center gap-4">
        {/* Avatar */}
        <div className="relative">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 font-semibold text-white">
            {contact.avatar ? (
              <img 
                src={contact.avatar} 
                alt={contact.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              contact.name.split(' ').map(n => n[0]).join('').toUpperCase()
            )}
          </div>
          
          {/* Online Status Indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-900 bg-green-400" />
        </div>

        {/* Contact Info */}
        <div className="flex-1">
          <h3 className="font-semibold text-white">{contact.name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Mail className="h-3 w-3" />
            <span>{contact.email}</span>
          </div>
        </div>

        {/* Time Badge */}
        <div className="text-right">
          <span className="inline-block rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
            {contact.lastContact}
          </span>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: showActions ? 1 : 0, x: showActions ? 0 : 20 }}
          className="flex gap-2"
        >
          <button
            className="rounded-lg bg-cyan-500/20 p-2 text-cyan-400 transition-colors hover:bg-cyan-500/30"
            title="Nieuwe offerte"
          >
            <FileText className="h-4 w-4" />
          </button>
          <button
            className="rounded-lg bg-blue-500/20 p-2 text-blue-400 transition-colors hover:bg-blue-500/30"
            title="Bericht sturen"
          >
            <MessageSquare className="h-4 w-4" />
          </button>
          <button
            className="rounded-lg bg-white/10 p-2 text-gray-400 transition-colors hover:bg-white/20"
            title="Meer opties"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Main List Component
export function ContactsList({ contacts }: { contacts: Contact[] }) {
  return (
    <div className="space-y-3">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Recent Toegevoegde Contacten</h2>
        <button className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-cyan-600">
          + Nieuw Contact
        </button>
      </div>

      {contacts.map((contact, index) => (
        <ContactCard key={contact.id} contact={contact} index={index} />
      ))}
    </div>
  );
}
