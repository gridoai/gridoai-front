"use client";
import { Create } from "@refinedev/chakra-ui";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect } from "react";
import { useToast } from "../../../../components/use-toast";
import {
  canUpload,
  incrementDocumentCount,
} from "../../../../services/rateLimit";
import { GradientBtn } from "../../../../components/GradientBtn";
import { calendlyLink } from "../../../calendlyLink";

interface DocumentForm {
  name: string;
  content: string;
  source: string;
}

const DocumentCreate: React.FC = () => {
  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DocumentForm>({
    refineCoreProps: {
      queryOptions: {
        onSuccess: incrementDocumentCount,
      },
    },
  });
  const { toast } = useToast();

  const name = watch(`name`);

  useEffect(() => {
    setValue(`source`, name);
  }, [name, setValue]);

  useEffect(() => {
    errors.root?.message && toast({ title: errors.root?.message });
  }, [errors, toast]);

  return (
    <Create
      isLoading={formLoading}
      saveButtonProps={{
        ...saveButtonProps,
        onClick: async (p) => {
          if (!(await canUpload())) {
            return toast({
              title: `Você chegou no limite de documentos`,
              description: (
                <Link href={calendlyLink} target="_blank">
                  <GradientBtn>Contate-nos para continuar usando</GradientBtn>
                </Link>
              ),
            });
          }
          saveButtonProps?.onClick(p);
        },
      }}
    >
      <FormControl mb="3" isInvalid={!!errors?.name}>
        <FormLabel>Name</FormLabel>
        <Input
          id="name"
          type="text"
          {...register(`name`, { required: `Name is required` })}
        />
        <FormErrorMessage>{`${errors.name?.message}`}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.content}>
        <FormLabel>Content</FormLabel>
        <Textarea
          id="content"
          {...register(`content`, { required: `Content is required` })}
        />
        <FormErrorMessage>{`${errors.content?.message}`}</FormErrorMessage>
      </FormControl>
    </Create>
  );
};

export default DocumentCreate;
