import { Dialogs } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import { Item } from "../types/ShoppingList";
import { colors } from "../styles/colors";
import { Header } from "./Header";
import { AddItemBar } from "./AddItemBar";
import { ItemGrupo } from "./ItemGrupo";
import { TotalBar } from "./TotalBar";

type ScreenOneProps = {
  route: RouteProp<MainStackParamList, "One">,
  navigation: FrameNavigationProp<MainStackParamList, "One">,
};

export function ScreenOne({ navigation }: ScreenOneProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [novoItem, setNovoItem] = useState("");
  const [itemSelecionado, setItemSelecionado] = useState<number | null>(null);

  const adicionarItem = () => {
    if (novoItem.trim() === "") {
      Dialogs.alert({
        title: "Atenção",
        message: "Por favor, insira o nome do item.",
        okButtonText: "OK"
      });
      return;
    }

    const novoId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
    
    setItems([...items, {
      id: novoId,
      nome: novoItem,
      quantidade: 1,
      valor: 0,
      completo: false
    }]);
    
    setNovoItem("");
  };

  const toggleItem = (id: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completo: !item.completo } : item
    ));
  };

  const atualizarQuantidade = (id: number, quantidade: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, quantidade } : item
    ));
  };

  const atualizarValor = (id: number, valor: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, valor } : item
    ));
  };

  const total = items.reduce((acc, item) => acc + (item.valor * item.quantidade), 0);

  return (
    <gridLayout rows="auto, *, auto">
      <Header row="0" />
      
      <scrollView row="1" style={styles.content}>
        <stackLayout>
          <AddItemBar
            value={novoItem}
            onValueChange={setNovoItem}
            onAdd={adicionarItem}
          />

          <stackLayout style={styles.lista}>
            {items.map((item) => (
              <ItemGrupo
                key={item.id}
                item={item}
                onToggleComplete={toggleItem}
                onSelect={setItemSelecionado}
                selecionado={itemSelecionado === item.id}
                onQuantidadeChange={atualizarQuantidade}
                onValorChange={atualizarValor}
              />
            ))}
          </stackLayout>
        </stackLayout>
      </scrollView>

      <TotalBar row="2" total={total} />
    </gridLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.background,
  },
  lista: {
    padding: 8,
  },
});