"use client";
import { Create } from "@refinedev/chakra-ui";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect } from "react";
import { useToast } from "../../../components/use-toast";

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
    setValue,
    formState: { errors },
  } = useForm<DocumentForm>();
  const { toast } = useToast();

  useEffect(() => {
    setValue("source", "web");
  }, [setValue]);

  useEffect(() => {
    errors.root?.message && toast({ title: errors.root?.message });
  }, [errors, toast]);

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <FormControl mb="3" isInvalid={!!errors?.name}>
        <FormLabel>Name</FormLabel>
        <Input
          id="name"
          type="text"
          {...register("name", { required: "Name is required" })}
        />
        <FormErrorMessage>{`${errors.name?.message}`}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.content}>
        <FormLabel>Content</FormLabel>
        <Textarea
          id="content"
          {...register("content", { required: "Content is required" })}
        />
        <FormErrorMessage>{`${errors.content?.message}`}</FormErrorMessage>
      </FormControl>
    </Create>
  );
};

export default DocumentCreate;
