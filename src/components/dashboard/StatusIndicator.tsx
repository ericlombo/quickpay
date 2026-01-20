import { CheckCircle2, Clock, XCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type StatusType = 'pending' | 'processing' | 'success' | 'failed' | 'draft';

interface StatusIndicatorProps {
  status: StatusType;
  label?: string;
}

export function StatusIndicator({ status, label }: StatusIndicatorProps) {
  const statusConfig: Record<StatusType, {
    icon: typeof CheckCircle2;
    dotColor: string;
    textColor: string;
    label: string;
  }> = {
    success: {
      icon: CheckCircle2,
      dotColor: 'text-green-600',
      textColor: 'text-foreground',
      label: 'Paid'
    },
    pending: {
      icon: Clock,
      dotColor: 'text-blue-600',
      textColor: 'text-foreground',
      label: 'Pending'
    },
    processing: {
      icon: AlertCircle,
      dotColor: 'text-amber-600',
      textColor: 'text-foreground',
      label: 'Processing'
    },
    failed: {
      icon: XCircle,
      dotColor: 'text-red-600',
      textColor: 'text-foreground',
      label: 'Failed'
    },
    draft: {
      icon: AlertCircle,
      dotColor: 'text-amber-600',
      textColor: 'text-foreground',
      label: 'Draft'
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;
  const displayLabel = label || config.label;

  return (
    <div className="flex items-center gap-2">
      <Icon className={cn('h-4 w-4', config.dotColor)} />
      <span className={cn('text-sm font-medium', config.textColor)}>
        {displayLabel}
      </span>
    </div>
  );
}
