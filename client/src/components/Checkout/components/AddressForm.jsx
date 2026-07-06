const FIELDS = [
  { name: 'fullName',  label: 'Full Name',        type: 'text',  placeholder: 'Priya Sharma',       span: true  },
  { name: 'phone',     label: 'Phone Number',      type: 'tel',   placeholder: '9876543210',         span: true  },
  { name: 'line1',     label: 'Address Line 1',    type: 'text',  placeholder: 'House no, Street',   span: true  },
  { name: 'line2',     label: 'Address Line 2',    type: 'text',  placeholder: 'Landmark (optional)',span: true  },
  { name: 'city',      label: 'City',              type: 'text',  placeholder: 'Mumbai',             span: false },
  { name: 'state',     label: 'State',             type: 'text',  placeholder: 'Maharashtra',        span: false },
  { name: 'pincode',   label: 'Pincode',           type: 'text',  placeholder: '400001',             span: false },
];

const AddressForm = ({ address, onChange }) => {
  const set = (key, val) => onChange({ ...address, [key]: val });

  return (
    <div>
      <h3 className="text-sm font-bold text-zinc-800 mb-4">Delivery Address</h3>
      <div className="grid grid-cols-2 gap-3">
        {FIELDS.map(({ name, label, type, placeholder, span }) => (
          <div key={name} className={span ? 'col-span-2' : 'col-span-1'}>
            <label className="block text-[11px] font-semibold text-zinc-500 mb-1">
              {label}
            </label>
            <input
              type={type}
              placeholder={placeholder}
              value={address[name] || ''}
              onChange={(e) => set(name, e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-xs text-zinc-800 placeholder-zinc-300 focus:outline-none focus:border-pink-400 transition-colors"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressForm;