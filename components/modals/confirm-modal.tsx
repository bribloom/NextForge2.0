"use client";

import { AlertDialog,
    AlertDialogCancel,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
 } from "@/components/ui/alert-dialog";


 interface ConfirmModalProps {
    children: React.ReactNode;
    onConfirm: () => void;

 };

 export const ConfirmModal = ({
    children,
    onConfirm
 }: ConfirmModalProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent style={{backgroundColor: '#fff'}}>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-neutral-900">Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription className="text-neutral-900">
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="text-neutral-900">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
 };