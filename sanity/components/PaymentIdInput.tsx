import React from 'react';
import { StringInputProps, PatchEvent, set } from 'sanity';

export function PaymentIdInput(props: StringInputProps) {
  const { value, onChange } = props;
  
  // Auto-generate payment ID if not provided
  React.useEffect(() => {
    if (!value) {
      const autoId = `manual-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
      onChange(PatchEvent.from(set(autoId)));
    }
  }, [value, onChange]);

  return (
    <div>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(PatchEvent.from(set(e.target.value)))}
        style={{
          width: '100%',
          padding: '8px 12px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '14px',
          backgroundColor: '#f9f9f9',
        }}
        placeholder="Auto-generated payment ID"
        readOnly
      />
      <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
        This ID is automatically generated and helps track this enrollment internally.
      </div>
    </div>
  );
}
